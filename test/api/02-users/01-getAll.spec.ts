import chai, {expect} from "chai";
import chaiHttp from "chai-http";
import router from "../../../src/main"
import { User } from "../../../src/users/user.entity"
import { AuthService } from "../../../src/users/auth.service"
import { userError } from "../../../src/error/messages"

chai.use(chaiHttp)

describe("Get all users", async () => {
    const user = await User.findOne({})
    const token = user?.accessToken
    it("get all users", async (done) => {
        chai.request(router)
        .get("/api/users")
        .set({"Authorization": `Bearer ${token}`})
        .end((err, res) => {
            expect(res.status).to.be.equal(200)
            expect(res.body).to.be.a("array")
            expect(res.body[0]).to.have.keys("name", "_id")
            User.deleteMany({})
            .then((data) => {
                done()
            }).catch((err) => {
                
            })
        })
    })
    it("users list length 0", async (done) => {
        chai.request(router)
        .get("/api/users")
        .set({"Authorization": `Bearer ${token}`})
        .end((err, res) => {
            expect(res.status).to.be.equal(404)
            expect(res.body).to.haveOwnProperty("status", 404)
            expect(res.body).to.haveOwnProperty("message", userError.emptyList)
            AuthService.register("Abdulaziz", "123").then((data) => {
                console.log("---------------")
                done()
            })
        })
    })
    after((done) => {
        done()
    })
})