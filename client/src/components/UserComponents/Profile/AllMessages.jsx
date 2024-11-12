import SortByComponent from "@/components/common/SortByComponent";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { deleteAllMessages, getMessagesByUser } from "@/store/userSlice/MessageSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ConfirmationModal from "@/components/common/ConfirmationModal";
import Pagination from "@/components/common/Pagination";

function AllMessages() {

    const { user } = useSelector(state => state.auth);
    const { messages } = useSelector(state => state.messages);
    const dispatch = useDispatch();
    const [sort, setSort] = useState(null);
    const [search, setSearch] = useState("");
    const [MessageType, setMessageType] = useState("SentMessages");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1); // Pagination state
    const messagesPerPage = 4; // Define how many messages to display per page
    const { toast } = useToast();



    // Handle sorting by different options
    function handleSort(value){
    setSort(value); // Update sort state
    }

    useEffect(() => {
        if (user?.id) {
            dispatch(
                getMessagesByUser({
                    userId: user?.id,
                    sort: sort,
                    search: search, // Pass the search term here
                })
            );
        }
    }, [dispatch, sort, user?.id, currentPage, search]); // Add searchTerm to the dependency array
    


    function handleSearch(e) {
        setSearch(e.target.value);
    }

    function handleTabChange(value) {
        setMessageType(value);
        setCurrentPage(1); // Reset page when switching tabs
    }

    // useEffect(() => {
    //     dispatch(getMessagesByUser({ userId : user?.id , sort : sort}));
    // }, [dispatch, sort, user?.id]);

 

    function handleDeleteAllMessage() {
        setIsModalOpen(true);
    }

    function handleConfirmDelete() {
        dispatch(deleteAllMessages({ userId: user?.id, type: MessageType })).then((data) => {
            if (data?.payload?.success) {
                toast({
                    title: "Messages deleted successfully",
                    variant: 'success',
                });
                dispatch(getMessagesByUser(user?.id));
            }
        });
        setIsModalOpen(false);
    }

    function handleCloseModal() {
        setIsModalOpen(false);
    }
    
    // Calculate paginated messages
    const filteredMessages = messages?.messages?.filter(message =>
        MessageType === "SentMessages"
            ? message.userSender._id === user?.id
            : message.userReceiver._id === user?.id
    ) || [];

    const paginatedMessages = filteredMessages.slice(
        (currentPage - 1) * messagesPerPage,
        currentPage * messagesPerPage
    );

    return (
        <section className="py-6 sm:py-12 w-full">
            <div className="container mx-auto px-4 bg-white rounded-xl shadow-lg pb-10 sm:h-full ">
                <Tabs defaultValue="SentMessages" className="w-full" onValueChange={handleTabChange}>
                    <TabsList className="grid w-full grid-cols-2 sm:grid-cols-2 bg-secondary text-primary">
                        {["Sent Messages", "IncomingMessages"].map((tab, idx) => (
                            <TabsTrigger key={idx} value={tab.replace(" ", "")}>{tab}</TabsTrigger>
                        ))}
                        <div className="mt-10 mb-10 flex">
                            <SortByComponent sort={sort} handleSort={handleSort} />
                            <Input
                                type="text"
                                placeholder="Search"
                                value={search}
                                className="placeholder:text-secondary text-secondary ml-3"
                                onChange={(e) => handleSearch(e)}
                            />
                        </div>
                        <div>
                            <Button 
                                className={`bg-red-900 ml-10 ${filteredMessages.length === 0 ? 'disabled:opacity-50 cursor-not-allowed' : ''}`} 
                                onClick={handleDeleteAllMessage}
                                disabled={filteredMessages.length === 0}
                            >
                                Delete All
                            </Button>
                        </div>
                    </TabsList>

                    <TabsContent value="SentMessages" className="mt-20 ">
                        <h3 className="text-lg font-semibold">
                            Sent Messages ({filteredMessages.length})
                        </h3>
                        {paginatedMessages.length > 0 ? (
                            paginatedMessages.map((message, index) => (
                                <div
                                    className="shadow-xl h-fit w-[500px] flex flex-row justify-center items-center gap-7 p-10 "
                                    key={index}
                                >
                                    <Avatar className="bg-black">
                                        <AvatarFallback className="bg-secondary text-primary cursor-pointer font-extrabold">
                                            {message.userReceiver.userName[0].toUpperCase()}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="flex flex-col w-full">
                                        <h2>Sent To : {message.userReceiver.userName}</h2>
                                        <h2>Subject : {message.subject}</h2>
                                        <h2 className="w-[200px] line-clamp-2">Message : {message.message}</h2>
                                    </div>
                                    <p className="text-sm text-gray-500">
                                        {new Date(message.createdAt).toLocaleDateString()} at {new Date(message.createdAt).toLocaleTimeString()}
                                    </p>
                                </div>
                            ))
                        ) : (
                            <div>No unread messages awaiting your reply.</div>
                        )}
                        {/* Pagination Component */}
                        <Pagination
                            currentPage={currentPage}
                            totalItems={filteredMessages.length}
                            itemsPerPage={messagesPerPage}
                            onPageChange={setCurrentPage}
                        />
                    </TabsContent>

                    <TabsContent value="IncomingMessages" className="mt-20">
                        <h3 className="text-lg font-semibold">
                            Incoming Messages ({filteredMessages.length})
                        </h3>
                        {paginatedMessages.length > 0 ? (
                            paginatedMessages.map((message, index) => (
                                <div
                                    className="shadow-xl h-fit w-[500px] flex flex-row justify-center items-center gap-7 p-10"
                                    key={index}
                                >
                                    <Avatar className="bg-black">
                                        <AvatarFallback className="bg-secondary text-primary cursor-pointer font-extrabold">
                                            {message.userSender.userName[0].toUpperCase()}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="flex flex-col w-full">
                                        <h2>Sent From : {message.userSender.userName}</h2>
                                        <h2>Subject : {message.subject}</h2>
                                        <h2 className="w-[200px] line-clamp-2">Message : {message.message}</h2>
                                    </div>
                                    <p className="text-sm text-gray-500">
                                        {new Date(message.createdAt).toLocaleDateString()} at {new Date(message.createdAt).toLocaleTimeString()}
                                    </p>
                                </div>
                            ))
                        ) : (
                            <div>No unread messages awaiting your reply.</div>
                        )}
                        {/* Pagination Component */}
                        <Pagination
                            currentPage={currentPage}
                            totalItems={filteredMessages.length}
                            itemsPerPage={messagesPerPage}
                            onPageChange={setCurrentPage}
                        />
                    </TabsContent>
                </Tabs>
            </div>

            {/* Confirmation Modal */}
            <ConfirmationModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onConfirm={handleConfirmDelete}
                message="Are you sure you want to delete all your messages?"
            />
        </section>
    );
}

export default AllMessages;
