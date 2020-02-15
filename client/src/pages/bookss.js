import React, { useState } from "react";
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

function Books() {
  const [value, setValue] = useState("");
  const [books, setBooks] = useState([]);

  const handleInputChange = event => {
    setValue(event.target.value);
  };

  const handleBooksSubmit = event => {
    event.preventDefault();
    API.getBooks(value)
      .then(res => {
        console.log(res.data.items);
        setBooks(res.data.items);
      })
      .catch(err => console.log(err));
  };

  const handleSaveBook = event => {
    const { authors, title, description } = books.volumeInfo;
    const imageLink = books.volumeInfo.imageLinks.smallThumbnail;
    event.preventDefault();
    if (authors && title && description && imageLink) {
      API.saveBook({ authors, title, description, imageLink })
        .then(res => {
          console.log(res.data);
          this.handleBooks();
        })
        .catch(err => console.log(err));
    }
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
          <h1>Search for Books</h1>
          <form onSubmit={handleBooksSubmit}>
            <Input
              value={value}
              onChange={handleInputChange}
              name="title"
              placeholder="Search... (required)"
            />
            <FormBtn disabled={!value} type="success" className="input-lg">
              Submit Book
            </FormBtn>
          </form>
        </Col>
        <Col size="md-12">
          {books.length === 0 ? <h1>Books Appear Here</h1> : <h1>Books</h1>}
          {books.length ? (
            <List>
              {books.map(book => (
                <ListItem key={book}>
                  <Card>
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
                    <CardBody>
                      <CardTitle>
                        <a href={book.volumeInfo.infoLink}>
                          <strong>{book.volumeInfo.title}</strong>
                        </a>
                      </CardTitle>
                      <CardSubtitle
                        style={{
                          margin: 5
                        }}
                      >
                        by <em>{book.volumeInfo.authors}</em>
                      </CardSubtitle>
                      <CardText>{book.volumeInfo.description}</CardText>
                      <Button onClick={handleSaveBook}>Save</Button>
                    </CardBody>
                  </Card>
                </ListItem>
              ))}
            </List>
          ) : (
            <h3>No Results to Display</h3>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default Books;
