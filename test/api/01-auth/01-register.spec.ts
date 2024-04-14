import chai, { expect } from "chai"
import chaiHttp from "chai-http"
import router from "../../../src/main"
import { User } from "../../../src/users/user.entity"
import { userError } from "../../../src/error/messages"

chai.use(chaiHttp)

describe("Auth Register", () => {
    before((done) => {
        User.findOneAndDelete({name: "Abdulaziz"})
        .then((data) => {
            done()
        }).catch((err) => {
            done()
        })
    })

    it("successfully registered", (done) => {
        const data = {
            name: "Abdulaziz",
            password: "123"
        }
        chai.request(router)
        .post("/api/auth/register")
        .send(data)
        .end((err, res) => {
            expect(res.status).to.be.equal(201)
            expect(res.body).to.be.a("string")
            done()
        })
    })

    it("Both name and password must be provided", (done) => {
        const data = {
            name: "",
            password: ""
        }
        chai.request(router)
        .post("/api/auth/register")
        .send(data)
        .end((err, res) => {
            expect(res.status).to.be.equal(400)
            expect(res.body).to.have.ownProperty("status", 400)
            expect(res.body).to.have.ownProperty("message", userError.fieldsNotProvided)
            done()
        })
    })

    it("user already exists", (done) => {
        const data = {
            name: "Abdulaziz",
            password: "123"
        }
        chai.request(router)
        .post("/api/auth/register")
        .send(data)
        .end((err, res) => {
            expect(res.status).to.be.equal(400)
            expect(res.body).to.have.ownProperty("status", 400)
            expect(res.body).to.have.ownProperty("message", userError.alreadyExists)
            done()
        })
    })

    after((done) => {
        done()
    })
})