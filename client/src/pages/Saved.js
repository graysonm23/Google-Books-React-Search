import React, { useState, useEffect } from "react";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, FormBtn } from "../components/Form";
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

  const handleBooksRender = () => {
    API.getAllBooks({})
      .then(res => {
        console.log(res.data);
        setBooks(res.data);
      })
      .catch(err => console.log(err));
  };

  const deleteBook = id => {
    API.deleteBook(id)
      .then(res => this.handleBooks())
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
                      src={book.volumeInfo.imageLinks.smallThumbnail}
                      alt="Card image cap"
                    />
                    <CardBody key={index + 2}>
                      <CardTitle key={index + 3}>
                        <a href={book.volumeInfo.infoLink}>
                          <strong>{book.volumeInfo.title}</strong>
                        </a>
                      </CardTitle>
                      <CardSubtitle
                        key={index + 4}
                        style={{
                          margin: 5
                        }}
                      >
                        by <em>{book.volumeInfo.authors}</em>
                      </CardSubtitle>
                      <CardText key={index + 5}>
                        {book.volumeInfo.description}
                      </CardText>
                      <Button key={index + 6} id={book.id}>
                        Save
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
