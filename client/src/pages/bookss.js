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
        console.log(res.data);
        setBooks(res.data.items);
      })
      .catch(err => console.log(err));
  };

  const handleSaveBook = event => {
    const Id = event.target.getAttribute("id");
    const Authors = event.target.getAttribute("authors");
    const Image = event.target.getAttribute("imagelink");
    const Description = event.target.getAttribute("description");
    const Title = event.target.getAttribute("title");
    const InfoLink = event.target.getAttribute("infolink");
    event.preventDefault();
    if (Id && Authors && Description && Image && Title && InfoLink) {
      API.saveBook({ Id, Authors, Image, Description, Title, InfoLink })
        .then(res => {})
        .catch(err => console.log("Unable to save book ", err));
    }
  };

  return (
    <Container fluid>
      <Row>
        <Col size="md-12">
          <h1>Search for Books</h1>
          <form onSubmit={handleBooksSubmit}>
            <Input
              autoFocus={true}
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
        <Col id="BooksColumn" size="md-12">
          {books.length === 0 ? <h1>Books Appear Here</h1> : <h1>Books</h1>}
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
                      src={
                        book.volumeInfo.imageLinks
                          ? book.volumeInfo.imageLinks.smallThumbnail
                          : "undefined"
                      }
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
                      <Button
                        infolink={book.volumeInfo.infoLink}
                        title={book.volumeInfo.title}
                        imagelink={
                          book.volumeInfo.imageLinks
                            ? book.volumeInfo.imageLinks.smallThumbnail
                            : "undefined"
                        }
                        description={book.volumeInfo.description}
                        authors={book.volumeInfo.authors}
                        key={index + 6}
                        id={book.id}
                        onClick={handleSaveBook}
                      >
                        Save
                      </Button>
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
