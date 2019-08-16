module.exports = class {
    static generateSnakeCase(name) {
        name = name.replace(/\-/g, "_");
        name = name.replace(/\s/g, "_");
        name = name.toLocaleLowerCase();

        return name;
    }

    static composerFriendlyName(name) {
        name = this.generateSnakeCase(name);
        name = name.replace(/_/g, "-");

        return name;
    }

    static condenseExtensionKey(extensionKey) {
        return extensionKey.replace(/_/g, "");
    }

    static generateUpperCamelCaseName(name) {
        name = this.generateSnakeCase(name);

        let parts = name.split("_");
        parts = parts.map(part => part.charAt(0).toUpperCase() + part.slice(1));
        return parts.join("");
    }

    static generateProperNameFromExtensionKey(extensionKey) {
        let parts = extensionKey.split("_");
        parts = parts.map(part => part.charAt(0).toUpperCase() + part.slice(1));
        return parts.join(" ");
    }
};