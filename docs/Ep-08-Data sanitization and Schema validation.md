# Notes

Data Sanitization and Schema validations
========================================
* We can have schema validations like

    minLength: 2,
    maxLength: 100,
    required: true,
    unique: true,
    lowercase: true,
    trim: true

* Custom validation using validate method
* These will run only for new insertions
* We will have to explicitly enable this for already existing data - runValidators in update methods

    validate(value) {
      if(!["Male", "Female", "Others"]. includes(value)) {
        throw new Error("Gender data is not valid!");
      }
    }

* {timestamps: true} --> In Schema options --> To add the timestamp for data

* For validations we can also use external libraries - validator.js (https://www.npmjs.com/package/validator)