export function parseLink(params, l, or, symb) {
    if(or) {

        const result = []

        const fullSymbol = l + symb
        console.log(fullSymbol)

        let i = params.indexOf(`${fullSymbol}`)

        while (i !== -1) {

            let ident = '';
            let find = i + 2
            while (params[find] !== '+' && params[find] !== ')') {

                ident += params[find]
                find++;

            }

            result.push(ident)
            i = params.indexOf(`${fullSymbol}`, i + 1)
        }

        return result
    }
}