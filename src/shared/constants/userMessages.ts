export const userMessages = {
  common: {
    invalidData: "invalidData",
    wentWrong: "wentWrong",
    tryAgainLater: "tryAgainLater",
    notFound: "notFound",
    unauthorized: "unauthorized",
  },

  auth: {
    invalidFormData: "invalidFormData",
    userExist: "userExist",
    emailExist: "emailExist",
    emailOrPassword: "emailOrPassword",
    accountCreated: "accountCreated",
    signedIn: "signedIn",
    signUpError: "signUpError",
  },

  review: {
    alreadyReviewed: "alreadyReviewed",
    invalidReviewData: "invalidReviewData",
    reviewCreated: "reviewCreated",
    reviewUpdated: "reviewUpdated",
    reviewDeleted: "reviewDeleted",
    reviewNotFound: "reviewNotFound",
    failedToCreateReview: "failedToCreateReview",
    failedToUpdateReview: "failedToUpdateReview",
    failedToDeleteReview: "failedToDeleteReview",
  },
} as const;
