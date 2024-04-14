import chai, {expect} from "chai";
import chaiHttp from "chai-http";
import router from "../../../src/main"
import { ApiSuccess } from "../../../src/success/api";
import { User } from "../../../src/users/user.entity";

chai.use(chaiHttp)

describe("Create category", () => {
    it("success", async () => {
        const user = await User.findOne({})
        const token = user?.accessToken
        const data = {
            title: "electonics"
        }
        chai.request(router)
        .post("/api/categories/")
        .set({"Authorization": `Bearer ${token}`})
        .send(data)
        .end((err, res) => {
            expect(res.body).to.be.equal(ApiSuccess.message("Category", "created"))
            expect(res.status).to.be.equal(201)
        })
    })
    it("internal error", async () => {
        const user = await User.findOne({})
        const token = user?.accessToken
        const data = {}
        chai.request(router)
        .post("/api/categories/")
        .set({"Authorization": `Bearer ${token}`})
        .send(data)
        .end((err, res) => {
            expect(res.body).to.have.keys("message", "status")
            expect(res.status).to.be.equal(500)
        })
    })
})