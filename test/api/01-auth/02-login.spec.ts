import chai, { expect } from "chai"
import chaiHttp from "chai-http"
import router from "../../../src/main"
import { userError } from "../../../src/error/messages"

chai.use(chaiHttp)

describe("Login", () => {
    it("login successfully", (done) => {
        const data = {
            name: "Abdulaziz",
            password: "123"
        }
        chai.request(router)
        .post("/api/auth/login")
        .send(data)
        .end((err, res) => {
            expect(res.status).to.be.equal(200)
            expect(res.body).to.be.a("string")
            done()
        })
    })
    it("login both name and password must be provided", (done) => {
        const data = {
            name: "",
            password: ""
        }
        chai.request(router)
        .post("/api/auth/login")
        .send(data)
        .end((err, res) => {
            expect(res.status).to.be.equal(400)
            expect(res.body).to.haveOwnProperty("message", userError.fieldsNotProvided)
            expect(res.body).to.haveOwnProperty("status", 400)
            done()
        })
    })
    it("login user was not found", (done) => {
        const data = {
            name: "Doston",
            password: "1234"
        }
        chai.request(router)
        .post("/api/auth/login")
        .send(data)
        .end((err, res) => {
            expect(res.status).to.be.equal(404)
            expect(res.body).to.haveOwnProperty("message", userError.notFound)
            expect(res.body).to.haveOwnProperty("status", 404)
            done()
        })
    })
    it("login password is incorrect", (done) => {
        const data = {
            name: "Abdulaziz",
            password: "1234"
        }
        chai.request(router)
        .post("/api/auth/login")
        .send(data)
        .end((err, res) => {
            expect(res.status).to.be.equal(400)
            expect(res.body).to.haveOwnProperty("message", userError.password)
            expect(res.body).to.haveOwnProperty("status", 400)
            done()
        })
    })

    after((done) => {
        done()
    })
})