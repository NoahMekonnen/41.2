const request = require("supertest");

const app = require("../app");
const db = require("../db");
const Book = require("../models/book");

process.env.NODE_ENV = "test"


describe("Book routes", function(){

    beforeEach(async function(){
        await db.query(`INSERT INTO books 
        ("isbn","amazon_url","author","language","pages","publisher","title","year")
        VALUES ('0691161518','http://a.co/eobPtX2','a','a',264,'a','a',2017)`)
    })

    afterEach(async function(){
        await db.query(`
        DELETE FROM books
        `)
    })


    test("GET /books getting all books", async function(){
        const res = await request(app).get('/books')
        expect(res.statusCode).toEqual(200)
        expect(res.body).toEqual({
            books: [{
                isbn:"0691161518",
                amazon_url:"http://a.co/eobPtX2",
                author:"a",
                language:"a",
                pages: 264,
                publisher: "a",
                title: "a",
                year: 2017
            }
            ]
        })
    })

    test("GET /books/:isbn getting one book", async function(){
        const res = await request(app).get('/books/0691161518')
        expect(res.statusCode).toEqual(200)
        expect(res.body).toEqual({
            book: {
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

    test("GET /books/:isbn getting non-existent book", async function(){
        const res = await request(app).get('/books/4')
        expect(res.statusCode).toEqual(404)
    })

    test("POST /books making a book", async function(){
        const res = await request(app).post('/books')
        .send({
            isbn:"1691161518",
            amazon_url:"http://a.co/eobPtX2",
            author:"a",
            language:"a",
            pages: 264,
            publisher: "a",
            title: "a",
            year: 2017
        })
        expect(res.statusCode).toEqual(201)
        expect(res.body).toEqual({
            book: {
                isbn:"1691161518",
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

    test("POST /books making a book with invalid year", async function(){
        const res = await request(app).post('/books')
        .send({
            isbn:"1691161518",
            amazon_url:"http://a.co/eobPtX2",
            author:"a",
            language:"a",
            pages: 264,
            publisher: "a",
            title: "a",
            year: "a"
        })
        expect(res.statusCode).toEqual(500)
    })

    test("PUT /books/:isbn Updating a books", async function(){
        const res = await request(app).put('/books/0691161518').send(
            {
                isbn:"0691161518",
                amazon_url:"http://a.co/eobPtX2",
                author:"a",
                language:"a",
                pages: 264,
                publisher: "a",
                title: "a",
                year: 2018
            }
        )
        expect(res.statusCode).toEqual(200)
        expect(res.body).toEqual({
            book: {
                isbn:"0691161518",
                amazon_url:"http://a.co/eobPtX2",
                author:"a",
                language:"a",
                pages: 264,
                publisher: "a",
                title: "a",
                year: 2018
            }
        })
    })

    test("PUT /books/:isbn Updating with invalid year", async function(){
        const res = await request(app).put('/books/0691161518').send(
            {
                isbn:"0691161518",
                amazon_url:"http://a.co/eobPtX2",
                author:"a",
                language:"a",
                pages: 264,
                publisher: "a",
                title: "a",
                year: "a"
            }
        )
        expect(res.statusCode).toEqual(500)
    })

    test("DELETE /books:isbn", async function(){
        const res = await request(app).delete('/books/0691161518')
        expect(res.statusCode).toEqual(200)
        expect(res.body).toEqual(
            { message: "Book deleted" }
        )
    })

    test("DELETE /books:isbn Deleting a non-existent book", async function(){
        const res = await request(app).delete('/books/4')
        expect(res.statusCode).toEqual(404)
    })


    afterAll(async function(){
        db.end()
    })
})