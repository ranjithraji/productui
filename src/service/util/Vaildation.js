import { CONFIG } from "./CONFIG";

export const Validation = (values, shcema) => {
    let fields = shcema;

    let error, inVailFileds = [];

    for (let index = 0; index < fields.length; index++) {
        const x = fields[index];

        if ((values[x.name] === '' || !values[x.name]) && !CONFIG.boolean.includes(values[x.name])) {
            inVailFileds.push(x.name);
            error = { ...error, [x.name]: `Please enter requied ${x.label || x.name}!.` };

        } else if (x.type) {

            if (x.type === 'string') {
                if (x.min && String(values[x.name]).length < x.min) {
                    inVailFileds.push(x.name);
                    error = { ...error, [x.name]: `Please enter ${x.label || x.name} with ${x.min} characters!.` }
                } else if (x.max && String(values[x.name]).length > x.max) {
                    inVailFileds.push(x.name);
                    error = { ...error, [x.name]: `Please enter ${x.label || x.name} must within ${x.max} characters!.` }
                }
            }

            if (x.type === 'number') {
                if (isNaN(values[x.name])) {
                    error = { ...error, [x.name]: `Please enter vaild ${x.label || x.name}!.` }
                } else if (x.min && values[x.name] < x.min) {
                    inVailFileds.push(x.name);
                    error = { ...error, [x.name]: `Please enter ${x.label || x.name} greater then ${x.min}!.` }
                } else if (x.max && values[x.name] > x.max) {
                    inVailFileds.push(x.name);
                    error = { ...error, [x.name]: `Please enter ${x.label || x.name} less then ${x.max}!.` }
                }
            }

            if (x.regex && !x.regex.test(values[x.name])) {
                inVailFileds.push(x.name);
                error = { ...error, [x.name]: `Please enter vaild ${x.label || x.name}!.` }
            }

            if (x.type === 'boolean') {
                if (!CONFIG.boolean.includes(values[x.name])) {
                    inVailFileds.push(x.name);
                    error = { ...error, [x.name]: `Please enter vaild ${x.label || x.name}!.` }
                }
            }
        }
    }

    return { message: error, inValidField: inVailFileds };
}