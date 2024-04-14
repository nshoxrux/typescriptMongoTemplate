import chai, {expect} from "chai";
import chaiHttp from "chai-http";
import router from "../../../src/main"
import { Category } from "../../../src/categories/category.entity"
import { User } from "../../../src/users/user.entity"

chai.use(chaiHttp)

describe("Get one category", () => {
    it("success", async () => {
        const user = await User.findOne({})
        const token = user?.accessToken
        const category = await Category.findOne({})
        const categoryId = category?._id
        chai.request(router)
        .get("/api/categories/" + categoryId)
        .set({"Authorization": `Bearer ${token}`})
        .end((err, res) => {
            expect(res.status).to.be.equal(200)
            expect(res.body).have.keys("_id", "title")
        })
    })
    it("notfound error", async () => {
        const user = await User.findOne({})
        const token = user?.accessToken
        const categoryId = 1
        chai.request(router)
        .get("/api/categories/" + categoryId)
        .set({"Authorization": `Bearer ${token}`})
        .end((err, res) => {
            expect(res.body).to.have.keys("message", "status")
        })
    })
})