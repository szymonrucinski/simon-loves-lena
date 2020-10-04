import { doesNotMatch } from "assert";
import chai from "chai";
import chaiHttp from "chai-http";
import { app } from "../src/app";

//Assertion Style
chai.should();
chai.use(chaiHttp);

describe("Test basic interaction", () => {
  it("Get initial message", (done) => {
    chai
      .request(app)
      .get("/")
      .end((err, response) => {
        response.should.have.status(404);
        response.text.should.be.a("string");
        done();
      });
  });
});
