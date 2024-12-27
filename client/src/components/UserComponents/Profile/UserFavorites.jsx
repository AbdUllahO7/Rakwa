import { getFavorites } from "@/store/userSlice/FavoritesSlice";
import { StarIcon } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LatestBusinessAndServices from "../HomeSections/LatestBusinessAndServices";
import { useToast } from "@/hooks/use-toast";



// !!! i tried create pagination but not success!!!


function UserFavorites() {
    const dispatch = useDispatch();
    const { favorites } = useSelector((state) => state.favorites);
    const { user } = useSelector((state) => state.auth);
    const { toast } = useToast();


    useEffect(() => {
        if (user?._id) {
            dispatch(getFavorites(user.id)).then((data) => {
                if (data?.payload?.success) {
                    toast({
                        title: "favorites updated Successfully",
                        variant: "success",
                    });
                }
            });

        }
    }, [dispatch, toast, user.id]);
    console.log(favorites)


    console.log(favorites)

    return (
        <section className="py-12">
            <div className="container mx-auto px-4">
                <div className="flex justify-center items-center mx-auto w-full mb-8">
                    <StarIcon className="text-yellow-600 mr-4" />
                    <h2 className="text-3xl font-bold text-center">Saved Business And Services</h2>
                </div>
                <div className="grid sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {favorites.length > 0 ? (
                        favorites.map((productItem) => (
                            <LatestBusinessAndServices key={productItem?._id} product={productItem} />
                        ))
                    ) : (
                        <p>No businesses found</p>
                    )}
                </div>
            </div>
        
        </section>
    );
}

export default UserFavorites;
