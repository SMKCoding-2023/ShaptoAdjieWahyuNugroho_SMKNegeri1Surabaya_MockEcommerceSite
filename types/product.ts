export interface Product {
    id?: number,
    name?: string,
    category?: string,
    price?: number,
    image?: string,
    color?: string,
    inCart?: boolean,
    desc?: string,
    quantity?: number,
}

export interface FormField {
    id?: string;
    name?: string;
    label?: string;
    type?: string;
    value?: string | object;
    placeholder?: string;
    checked?: boolean;
    required?: boolean;
}