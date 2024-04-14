import chai, {expect} from "chai";
import chaiHttp from "chai-http";
import router from "../../../src/main"
import { itemError } from "../../../src/error/messages"
import { Category } from "../../../src/categories/category.entity";
import { User } from "../../../src/users/user.entity";

chai.use(chaiHttp)

describe("Get all categories", () => {
    it("success", async () => {
        const user = await User.findOne({})
        const token = user?.accessToken
        chai.request(router)
        .get("/api/categories/")
        .set({"Authorization": `Bearer ${token}`})
        .end((err, res) => {
            expect(res.body).to.be.a("array")
            expect(res.status).to.be.equal(200)
            expect(res.body[0]).have.keys("_id", "title")
        })
    })
    it("notfound error", async () => {
        const user = await User.findOne({})
        const token = user?.accessToken
        chai.request(router)
        .get("/api/categories/")
        .set({"Authorization": `Bearer ${token}`})
        .end(async (err, res) => {
            expect(res.body).to.have.ownProperty("message", itemError.emptyList("Categories"))
            expect(res.body).to.have.ownProperty("status", 404)
            expect(res.status).to.be.equal(404)
        })
    })
})