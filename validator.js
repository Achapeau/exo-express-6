const validateMovie = (req, res, next) => {
    const { title, director, year, color, duration } = req.body;
    const errors =[];

    const nameRegex = /^[a-zA-z\s]+$/;
    const numberRegex = /^[0-9]+$/;

    if(title == null) {
        errors.push({ field:"title", message:"the field 'title' is required"})
    } else if(title.length >= 255) {        
        errors.push({ field: "title", message: "Should countain less 255 characters"})
    }

    if(director == null) {
        errors.push({ field:"director", message:"the field director is required"})
    } else if(director.length >= 255) {
        errors.push({ field: "director", message: "Should countain less 255 characters"})
    } else if(!nameRegex.test(director)) {
        errors.push({ field: "director", message: "the field 'director' only countains alphabetical characters"})
    }

    if(year == null) {
        errors.push({ field:"year", message:"the field 'year' is required"})
    } else if(year.length >= 5) {
        errors.push({ field: "year", message: "Sorry, we don't live in the turfu"})
    } else if(!numberRegex.test(year)) {
        errors.push({ field: "year", message: "the field 'year' only countains numeric characters"})
    }

    if(color == null) {
        errors.push({ field:"color", message:"the field 'color' is required"})
    } else if(color.length >= 2) {
        errors.push({ field: "color", message: "Should countain less 2 characters"})
    } else if(!numberRegex.test(color)) {
        errors.push({ field: "color", message: "the field 'color' only countains numeric characters"})
    }
    
    if(duration == null) {
        errors.push({ field:"duration", message:"the field 'duration' is required"})
    } else if(duration >= 600) {
        errors.push({ field: "duration", message: "We want to see a movie, not your life"})
    } else if(!numberRegex.test(duration)) {
        errors.push({ field: "duration", message: "the field 'duration' only countains numeric characters"})
    }
        
    if(errors.length) {
        res.status(422).json({ validationErrors: errors});
    } else {
        next();
    }

}

const validateUser = (req, res, next) => {
    const { firstname, lastname, email, city, language } = req.body;
    const errors = [];

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$/
    const nameRegex = /^[a-zA-z\s]+$/;
    
    if(firstname == null) {
        errors.push({ field:"firstname", message:"the field 'firstname' is required"})
    } else if(firstname.length >= 255) {
        errors.push({ field: "firstname", message: "Should countain less 255 characters"})
    } else if(!nameRegex.test(firstname)) {
        errors.push({ field: "firstname", message: "the field 'firstname' only countains alphabetical characters"})
    }

    if(lastname == null) {
        errors.push({ field:"lastname", message:"the field 'lastname' is required"})
    } else if(lastname.length >= 255) {
        errors.push({ field: "lastname", message: "Should countain less 255 characters"})
    } else if(!nameRegex.test(lastname)) {
        errors.push({ field: "lastname", message: "the field 'lastname' only countains alphabetical characters"})
    }

    if(email == null) {
        errors.push({ field:"email", message:"the field 'email' is required"})
    } else if(email.length >= 255) {
        errors.push({ field: "email", message: "Should countain less 255 characters"})
    } else if (!emailRegex.test(email)) {
        errors.push({ field: "email", message: "Invalid mail" })
    }

    if(city == null) {
        errors.push({ field:"city", message:"the field 'city' is required"})
    } else if(city.length >= 255) {
        errors.push({ field: "city", message: "Should countain less 255 characters"})
    } else if(!nameRegex.test(city)) {
        errors.push({ field: "city", message: "the field 'city' only countains alphabetical characters"})
    }

    if(language == null) {
        errors.push({ field:"language", message:"the field 'language' is required"})
    } else if(language.length >= 255) {
        errors.push({ field: "language", message: "Should countain less 255 characters"})
    } else if(!nameRegex.test(language)) {
        errors.push({ field: "language", message: "the field 'language' only countains alphabetical characters"})
    }
    

    if (errors.length) {
        res.status(422).json({ validationErrors: errors });
      } else {
        next();
      }
};

module.exports = {
    validateMovie,
    validateUser
}