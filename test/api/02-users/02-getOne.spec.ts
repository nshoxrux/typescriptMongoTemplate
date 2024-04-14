import chai, { expect } from "chai"
import chaiHttp from "chai-http"
import router from "../../../src/main"
import { User } from "../../../src/users/user.entity"

chai.use(chaiHttp)
describe("Get one", async () => {
    const user = await User.findOne()
    const token = user?.accessToken
    it("get one user successfully", async () => {
        const userId = user?._id
        chai.request(router)
        .get(`/api/users/${userId}`)
        .set({"Authorization": `Bearer ${token}`})
        .end((err, res) => {
            expect(res.status).to.be.equal(200)
            expect(res.body).to.have.keys("_id", "name")
        })
    })
    it("get internal error", async() => {
        const userId = 0
        chai.request(router)
        .get(`/api/users/${userId}`)
        .set({"Authorization": `Bearer ${token}`})
        .end((err, res) => {
            expect(res.status).to.be.equal(500)
            expect(res.body).to.have.keys("status", "message")
        })
    })

    after((done) => {
        done()
    })
})