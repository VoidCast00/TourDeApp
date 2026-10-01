export type User = {
    id: string,
    name: string,
    passwordHash:string,
}

export type Category = {
    slug: string,
    name: string,
}

export type Listing = {
    id: number,
    title: string,
    description: string,
    category: string, // Category.slug
    city: string,
    price: string, // free text for now ("20 €/h", "Negotiable")
    postedAt: string, // TODO: real date once it comes from the db
    author: string,
    image?: string, // url, placeholder square is shown when missing
    featured?: boolean, // "TOP" listings, shown with a badge
}
