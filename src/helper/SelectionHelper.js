class SelectionHelper {
    static get (currentValue, mapping, fallback) {
        const mappingValues = Object.keys(mapping);

        for (const mappingValue of mappingValues) {
            if (mappingValue === currentValue) {
                return mapping[currentValue];
            }
        }

        return fallback;
    }
}

export default SelectionHelper;