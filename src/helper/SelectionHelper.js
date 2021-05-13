class SelectionHelper {
    static get (currentValue, mapping, fallback, typeCompare = true) {
        const mappingValues = Object.keys(mapping);

        for (const mappingValue of mappingValues) {
            if (
                typeCompare ?
                    mappingValue === currentValue :
                    mappingValue == currentValue
            ) {
                return mapping[currentValue];
            }
        }

        return fallback;
    }
}

export default SelectionHelper;