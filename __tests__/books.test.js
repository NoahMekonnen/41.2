const request = require("supertest");

const app = require("../app");
const db = require("../db");
const Book = require("../models/book");





describe("Book routes", function(){

    beforeEach(async function(){
        await db.query(`INSERT INTO books 
        ("isbn","amazon_url","author","language","pages","publisher","title","year")
        VALUES ("0691161518","http://a.co/eobPtX2","a","a",264,"a,a",2017)`)
        // await db.query(`INSERT INTO books 
        // (isbn,amazon_url,author,language,pages,publisher,title,year)
        // VALUES (1691161518,http://a.co/eobPtX2,Matthew Lane,english,
        // 264,Princeton University Press,
        // Power-Up: Unlocking the Hidden Mathematics in Video Games,2017)`)
    })


    test("GET / getting all books", async function(){
        const res = await request(app).get('/')
        expect(res.statusCode).toEqual(200)
        expect(res.body).toEqual({
            books: {
                isbn:"0691161518",
                amazon_url:"http://a.co/eobPtX2",
                author:"a",
                language:"a",
                pages: 264,
                publisher: "a",
                title: "a",
                year: 2017
            }
        })
    })

    afterAll(async function(){
        db.end()
    })
})