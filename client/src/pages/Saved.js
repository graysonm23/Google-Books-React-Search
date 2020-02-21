import React, { useState, useEffect } from "react";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import API from "../utils/API";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button
} from "reactstrap";

function SavedBooks() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    handleBooksRender();
  }, []);

  const handleBooksRender = res => {
    API.getAllBooks({})
      .then(res => {
        setBooks(res.data);
      })
      .catch(err => console.log(err));
  };

  const deleteBook = event => {
    const Id = event.target.getAttribute("id");
    API.deleteBook(Id)
      .then(res => {
        return handleBooksRender();
      })
      .catch(err => console.log(err));
  };

  return (
    <Container fluid>
      <Row>
        <Col size="md-12">
          {books.length === 0 ? (
            <h1>Saved Books Appear Here</h1>
          ) : (
            <h1>Saved Books</h1>
          )}
          {books.length ? (
            <List>
              {books.map((book, index) => (
                <ListItem key={book}>
                  <Card key={index + 1}>
                    <CardImg
                      style={{
                        maxHeight: 100,
                        maxWidth: 100,
                        margin: 20
                      }}
                      top
                      width="100%"
                      src={book.image}
                      alt="Card image cap"
                    />
                    <CardBody key={index + 2}>
                      <CardTitle key={index + 3}>
                        <a href={book.infoLink}>
                          <strong>{book.title}</strong>
                        </a>
                      </CardTitle>
                      <CardSubtitle
                        key={index + 4}
                        style={{
                          margin: 5
                        }}
                      >
                        by <em>{book.author}</em>
                      </CardSubtitle>
                      <CardText key={index + 5}>{book.description}</CardText>
                      <Button
                        onClick={deleteBook}
                        key={index + 6}
                        id={book._id}
                      >
                        Delete
                      </Button>
                    </CardBody>
                  </Card>
                </ListItem>
              ))}
            </List>
          ) : (
            <div>
              <h3>You Have No Saved Books</h3>
              <a href="/">You can search for some here</a>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default SavedBooks;
