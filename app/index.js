const path = require("path");

const Generator = require("yeoman-generator");

const NameUtility = require("./utility/NameUtility");

module.exports = class extends Generator {

    constructor(args, opts) {
        super(args, opts);
    }

    async prompting() {

        this.answers = await this.prompt([
            {
                type: "input",
                name: "vendorName",
                message: "What is your extension vendor name?",
                default: "MyCompany",
                validate: value => (/^[A-Z][a-zA-Z0-9]*$/g).test(value),
                store: true
            },
            {
                type: "input",
                name: "extensionKey",
                message: "What is your extension key?",
                default: "my_custom_extension",
                validate: value => (/^[a-z0-9]+(\_[a-z0-9]+)*$/g).test(value)
            },
            {
                type: "input",
                name: "authorName",
                message: "What is your name?",
                default: this.user.git.name
            },
            {
                type: "input",
                name: "authorEmail",
                message: "What is your email?",
                default: this.user.git.email,
                validate: value => (/^.+\@.+\..+$/g).test(value)
            },
            {
                type: "list",
                name: "extensionType",
                message: "Which type of extension to you want to generate?",
                choices: [
                    {
                        name: "Standard TYPO3 Extension, with Controllers, Plugins, etc.",
                        value: "standard"
                    },
                    {
                        name: "Template Extension, standalone",
                        value: "template-standalone"
                    },
                    /* Coming soon...
                    {
                        name: "Template Extension, based on bootstrap_package",
                        value: "template-bootstrap"
                    }*/
                ],
                store: true
            }
        ]);
    }

    writing() {
        this.log("Generating extension files...");

        const {
            vendorName,
            extensionKey,
            authorName,
            authorEmail,
            extensionType
        } = this.answers;

        const rootDir = this.destinationPath(extensionKey);

        const dirs = {
            root: rootDir,
            classes: path.join(rootDir, "Classes"),
            configuration: path.join(rootDir, "Configuration"),
            resources: path.join(rootDir, "Resources"),
            tests: path.join(rootDir, "Tests", "Unit")
        };

        const phpVendorName = NameUtility.generateUpperCamelCaseName(vendorName);
        const phpExtensionName = NameUtility.generateUpperCamelCaseName(extensionKey);

        const templateVariables = {
            authorName,
            authorEmail,
            composerVendorName: NameUtility.composerFriendlyName(vendorName),
            composerExtensionKey: NameUtility.composerFriendlyName(extensionKey),
            extensionKey,
            extensionKeyCondensed: NameUtility.condenseExtensionKey(extensionKey),
            extensionName: NameUtility.generateProperNameFromExtensionKey(extensionKey),
            phpVendorName,
            phpExtensionName
        };

        this._copyResources(extensionType, dirs, templateVariables);
    }

    _copyResources(extensionType, dirs, templateVariables) {
        // copy content
        this.fs.copy(
            this.templatePath("shared/_.gitignore"),
            path.join(dirs.root, ".gitignore"),
        );

        this.fs.copy(
            this.templatePath("shared/typoscript-lint.yml"),
            path.join(dirs.root, "typoscript-lint.yml"),
        );

        this.fs.copy(
            this.templatePath("shared/ext_icon.svg"),
            path.join(dirs.root, "ext_icon.svg"),
        );

        this.fs.copyTpl(
            this.templatePath("shared/README.md"),
            path.join(dirs.root, "README.md"),
            templateVariables
        );

        if (extensionType === "standard") {
            this._copyResourcesForStandardExtension(dirs, templateVariables);
        } else if (extensionType === "template-standalone") {
            this._copyResourcesForStandaloneTemplateExtension(dirs, templateVariables);
        } else if (extensionType === "template-bootstrap") {
            this._copyResourcesForBootstrapPackagePoweredTemplateExtension(dirs, templateVariables);
        }
    }

    _copyResourcesForStandardExtension(dirs, templateVariables) {
        // Root Dir
        this.fs.copyTpl(
            this.templatePath("shared/ext_emconf.php"),
            path.join(dirs.root, "ext_emconf.php"),
            {...templateVariables, extensionCategory: "misc"}
        );
        this.fs.copyTpl(
            this.templatePath("standard/composer.json"),
            path.join(dirs.root, "composer.json"),
            templateVariables
        );
        this.fs.copyTpl(
            this.templatePath("standard/ext_localconf.php"),
            path.join(dirs.root, "ext_localconf.php"),
            templateVariables
        );
        this.fs.copyTpl(
            this.templatePath("standard/ext_tables.php"),
            path.join(dirs.root, "ext_tables.php"),
            templateVariables
        );
        this.fs.copyTpl(
            this.templatePath("standard/Classes"),
            dirs.classes,
            templateVariables
        );
        this.fs.copyTpl(
            this.templatePath("standard/Configuration"),
            dirs.configuration,
            templateVariables
        );
        this.fs.copyTpl(
            this.templatePath("standard/Resources"),
            dirs.resources,
            templateVariables
        );
        this.fs.copyTpl(
            this.templatePath("standard/Tests"),
            path.join(dirs.tests),
            templateVariables
        );
    }

    _copyResourcesForStandaloneTemplateExtension(dirs, templateVariables) {
        this.fs.copyTpl(
            this.templatePath("shared/ext_emconf.php"),
            path.join(dirs.root, "ext_emconf.php"),
            {...templateVariables, extensionCategory: "template"}
        );
        this.fs.copyTpl(
            this.templatePath("template-standalone/composer.json"),
            path.join(dirs.root, "composer.json"),
            templateVariables
        );
        this.fs.copyTpl(
            this.templatePath("template-standalone/ext_localconf.php"),
            path.join(dirs.root, "ext_localconf.php"),
            templateVariables
        );
        this.fs.copyTpl(
            this.templatePath("template-standalone/Configuration"),
            dirs.configuration,
            templateVariables
        );
        this.fs.copyTpl(
            this.templatePath("template-standalone/Resources"),
            dirs.resources,
            templateVariables
        );
    }

    _copyResourcesForBootstrapPackagePoweredTemplateExtension(dirs, templateVariables) {
        this.log("FATAL NOT YET IMPLEMENTED")
        process.exit(1);
    }
}