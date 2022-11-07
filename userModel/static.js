const mongoose = require("mongoose");
const schema = require("mongoose").Schema;
const staticSchema = new schema({
  type: {
    type: String,
  },
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  status: {
    type: String,
    default: "ACTIVE",
  },
});
const staticModel = mongoose.model("admin", staticSchema);
module.exports = staticModel;

mongoose
  .model("admin", staticSchema)
  .findOne({ userType: { $in: "ADMIN" } }, (err, res) => {
    if (err) {
      console.log("SERVER ERROR");
    } else if (res) {
      console.log("content already exists");
    } else {
      let obj1 = {
        status: "ACTIVE",
        type: "Privacy Policy blockchain",
        title: "Blockchain",
        description:
          "Privacy is of importance at the Blockchain.com group of companies. We recognise the significance of protecting information which is stored on our servers or network or is intended to be stored on our servers or network and which relates to an individual. The data we protect are the “Personal Data” which is any information relating to an identified or identifiable natural person, sometimes called a data subject, and have made protecting the privacy and the confidentiality of Personal Data a fundamental component of the way we do business. This Privacy Policy informs you of the ways we work to ensure privacy and the confidentiality of Personal Data and describes the information we gather, how we use those Personal Data and the circumstances under which we disclose such information to third-parties",
      };
      let obj2 = {
        status: "ACTIVE",
        type: "Terms And Conditions ",
        title: "Website Covered",
        description:
          "This Privacy Policy is designed to address regulatory requirements of the jurisdictions in which Blockchain.com offers its Services, including the General Data Protection Regulation (“GDPR”), as enacted by the European Commission. In this Privacy Policy, the term “Service” and “Services” has the same meaning as described in the User Agreement, but excludes API services, which are governed by a separate agreement. If you do not agree with this Privacy Policy, in general, or any part of it, you should not use the Services. This Privacy Policy is periodically reviewed to ensure that any new obligations and changes to our business model are taken into consideration. We may amend this Privacy Policy at any time by posting an amended version on our website.",
      };
      mongoose.model("admin", staticSchema).create(obj1, obj2, (err, res) => {
        if (err) {
          console.log("error");
        } else {
          console.log("static content is saved default", res);
        }
      });
    }
  });
