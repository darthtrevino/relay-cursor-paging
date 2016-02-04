const generator = require("dts-generator").default;
generator({
    name: 'relay-sequelize-pagination',
    project: '.',
    out: 'relay-sequelize-pagination.d.ts',
    files: ['index.ts'],
    externs: [
        'chai',
        'validator.js',
        'Validator',
        'ValidatorJS'
    ],
    excludes: [
        'node_modules/**/*.d.ts',
        'typings/**/*.d.ts',
        'src/*.spec.ts'
    ] 
});