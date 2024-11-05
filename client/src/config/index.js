export const registerFormControls = [
    {
        name : 'userName',
        label : 'User Name',
        placeholder : 'Enter Your User Name',
        componentType : 'input',
        type : 'text',
    },
    {
        name : 'email',
        label : 'Email',
        placeholder : 'Enter Your Email',
        componentType : 'input',
        type : 'email'
    },
    {
        name : 'password',
        label : 'Password',
        placeholder : 'Enter Your Password',
        componentType : 'input',
        type : 'password'
    }
]



export const loginFormControls = [
    
    {
        name : 'email',
        label : 'Email',
        placeholder : 'Enter Your Email',
        componentType : 'input',
        type : 'email'
    },
    {
        name : 'password',
        label : 'Password',
        placeholder : 'Enter Your Password',
        componentType : 'input',
        type : 'password'
    }
];


export const shoppingViewHeaderMenuItems = [
    {
        id: "home",
        label: "Home",
        path: "/user/home",
    },
    {
        id: "business",
        label: "Business",
        path: "/user/business",
    },
    {
        id: "q&a",
        label: "Q&A",
        path: "/user/Q&A",
    },
    {
        id: "Classifieds",
        label: "Classifieds",
        path: "/user/Classifieds",
    },
    {
        id: "blog",
        label: "Blog",
        path: "/user/blog",
    },
    {
        id: "dalilNews",
        label: "DalilNews",
        path: "/user/dalilNews",
    },
    {
        id: "listing",
        label: "Accessories",
        path: "/user/listing",
    },
    {
        id: "search",
        label: "Search",
        path: "/user/search",
    },
];



export const addCategoryFormElements = [
    {
    label: "Title",
    name: "title",
    componentType: "input",
    type: "text",
    placeholder: "Enter Category title",
    },
];

export const addSubCategoryFormElements = [
    {
    label: "Title",
    name: "title",
    componentType: "input",
    type: "text",
    placeholder: "Enter sub Categories title",
    },

];

export const sortOptions = [
    { id: "price-lowtohigh", label: "Price: Low to High" },
    { id: "price-hightolow", label: "Price: High to Low" },
    { id: "title-atoz", label: "Title: A to Z" },
    { id: "title-ztoa", label: "Title: Z to A" },
    ];


export const filterOptions = {
    category: [
        { id: "men", label: "Men" },
        { id: "women", label: "Women" },
        { id: "kids", label: "Kids" },
        { id: "accessories", label: "Accessories" },
        { id: "footwear", label: "Footwear" },
        { id: "electronics", label: "Electronics" },
        { id: "home", label: "Home" },
        { id: "sports", label: "Sports" },
        { id: "furniture", label: "Furniture" },
        { id: "groceries", label: "Groceries" },
    ],
    brand: [
        { id: "nike", label: "Nike" },
        { id: "adidas", label: "Adidas" },
        { id: "puma", label: "Puma" },
        { id: "levi", label: "Levi's" },
        { id: "zara", label: "Zara" },
        { id: "h&m", label: "H&M" },
        { id: "gucci", label: "Gucci" },
        { id: "prada", label: "Prada"},
        { id: "versace", label: "Versace" },
        { id: "ralph-lauren", label: "Ralph Lauren" },
        { id: "uniqlo", label: "Uniqlo" },
        { id: "under-armour", label: "Under Armour" },
        { id: "new-balance", label: "New Balance"  },
        { id: "tommy-hilfiger", label: "Tommy Hilfiger" },
        { id: "burberry", label: "Burberry" },
        { id: "calvin-klein", label: "Calvin Klein" }
    ],
    };


export const pricingPlanFormElements = [
        {
            name: 'title',
            label: 'Title',
            componentType: 'input',
            type: 'text',
            placeholder: 'Enter plan title',
        },
        {
            name: 'price',
            label: 'Price',
            componentType: 'input',
            type: 'text',
            placeholder: 'Enter price',
        },
        {
            name: 'frequency',
            label: 'Frequency',
            componentType: 'select', // or 'input' based on your requirement
            options: [
                { id: 'monthly', label: 'Monthly' },
                { id: 'yearly', label: 'Yearly' },
            ],
            placeholder: 'Select frequency',
        },
        {
            name: 'features',
            label: 'Features',
            componentType: 'textarea',
            placeholder: 'Enter features',
        },
];
    


export const addBusinessFormElements = [
    {
        label: "Email",
        name: "email",
        componentType: "input",
        type: "email",
        placeholder: "Enter Business Email",
        validation: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value), // Email validation regex
    },
    {
        label: "Business Name",
        name: "title",
        componentType: "input",
        type: "text",
        placeholder: "Enter Business Name",
        validation: (value) => value.length >= 3, // Business name validation (min length)
    },
    {
        label: "Business Description",
        name: "description",
        componentType: "textarea",
        placeholder: "Enter Business Description",
        validation: (value) => value.length >= 10, // Description validation (min length)
    },
    {
        label: "Country",
        name: "country",
        componentType: "input",
        type: "text",
        placeholder: "Enter Business Country",
    },
    {
        label: "State",
        name: "state",
        componentType: "input",
        type: "text",
        placeholder: "Enter Business State",
    },
    {
        label: "City",
        name: "city",
        componentType: "input",
        type: "text",
        placeholder: "Enter Business City",
    },
    {
        label: "Google Map Location",
        name: "map",
        componentType: "input",
        type: "url",
        placeholder: "Enter Google Maps URL",
    },
    {
        label: "Phone Number",
        name: "phone",
        componentType: "input",
        type: "tel",
        placeholder: "Enter Business Phone Number",
        validation: (value) => /^\+?[\d\s-]{10,}$/.test(value), // Phone number validation regex
    },
];
export const addOnlineBusinessFormElements = [
    {
        label: "Email",
        name: "email",
        componentType: "input",
        type: "email",
        placeholder: "Enter Business Email",
        validation: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value), // Email validation regex
    },
    {
        label: "Business Name",
        name: "title",
        componentType: "input",
        type: "text",
        placeholder: "Enter Business Name",
        validation: (value) => value.length >= 3, // Business name validation (min length)
    },
    {
        label: "Business Description",
        name: "description",
        componentType: "textarea",
        placeholder: "Enter Business Description",
        validation: (value) => value.length >= 10, // Description validation (min length)
    },
    {
        label: "WhatsApp",
        name: "whatsApp",
        componentType: "input",
        type: "url",
        placeholder: "Enter Business WhatsApp Link",
    },
    {
        label: "FaceBook",
        name: "faceBook",
        componentType: "input",
        type: "url",
        placeholder: "Enter Business FaceBook Link",
    },
    {
        label: "Instagram",
        name: "instagram",
        componentType: "input",
        type: "url",
        placeholder: "Enter Business Instagram Link",
    },

];