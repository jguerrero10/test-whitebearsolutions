export class Properties{
    type?: string;
    format?: string;
    title?: string;
    default?: string;
    pattern?: string;
    value?: string;
    error?: string;
}
export class FormModel{
    title?: string;
    description?: string;
    required?: string[];
    properties?: Properties;
}
