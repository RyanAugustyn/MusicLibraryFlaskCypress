/*
describe("submit-search-delete ", () => {
  it("submit song", () => {
    cy.visit("http://localhost:3000/");

    cy.get('[data-test="title"]').type("Like the 309");
    cy.get('[data-test="artist"]').type("Johnny Cash");
    cy.get('[data-test="album"]').type("American 5");
    cy.get('[data-test="genre"]').type("Blues");
    cy.get('[data-test="release"]').type("2004-07-04");
    cy.get('[data-test="time"]').type("275");

    cy.get('[data-test="song submit"]').click();
  });
  it("search song", () => {
    cy.visit("http://localhost:3000/");

    cy.get('[data-test="searchbar"]').type("Like the 309").wait(2000);
    cy.contains("Like the 309").should("exist");
  });
  it("delete song", () => {
    cy.visit("http://localhost:3000/");
    cy.contains("Like the 309")
      .parents("tr")
      .find("button")
      .contains("Delete Song")
      .click();
  });
});

*/
/*
//Use edit button to change a song title 
describe("verify edit", () => {
  it("changes the title of a song", () => {
    cy.visit("http://localhost:3000/");
    cy.contains("Jimmy Eat World")
      .parents("tr")
      .find("button")
      .contains("Edit Song")
      .click();
    cy.get('[data-test="edit title"]').clear().type("Bitterness");
    cy.get('[data-test="update song button"]').click();

    cy.contains("Jimmy Eat World")
      .parent("tr")
      .contains("Bitterness")
      .should("exist");
  });
});
*/

Cypress.Commands.add(
  "createRecord",
  (title, artist, album, genre, release, time) => {
    cy.get('[data-test="title"]').type(title);
    cy.get('[data-test="artist"]').type(artist);
    cy.get('[data-test="album"]').type(album);
    cy.get('[data-test="genre"]').type(genre);
    cy.get('[data-test="release"]').type(release);
    cy.get('[data-test="time"]').type(time);

    cy.get('[data-test="song submit"]').click();
  }
);

Cypress.Commands.add("deleteRecord", (title) => {
  cy.contains(title)
    .parents("tr")
    .find("button")
    .contains("Delete Song")
    .click();
});

Cypress.Commands.add(
  "submitAndVerify",
  (title, artist, album, genre, release, time) => {
    return cy.request("Post", "http://127.0.0.1:5000/api/songs", {
      title: title,
      artist: artist,
      album: album,
      genre: genre,
      release_date: release,
      running_time: time,
    });
  }
);

//Refactored tests
describe("submit-search-delete ", () => {
  it.skip("submit song", () => {
    cy.visit("http://localhost:3000/");

    cy.createRecord(
      "Float",
      "Flogging Molly",
      "Float",
      "Celtic Rock",
      "2008-03-04",
      "300"
    );
  });
  it.skip("search song", () => {
    cy.visit("http://localhost:3000/");
    cy.createRecord(
      "If I Ever Leave This World Alive",
      "Flogging Molly",
      "Drunken Lullabies",
      "Celtic Rock",
      "2008-03-04",
      "240"
    );
    cy.get('[data-test="searchbar"]').type("Float").wait(2000);
    cy.contains("Float").should("exist");
  });
  it.skip("delete song", () => {
    cy.visit("http://localhost:3000/");
    cy.createRecord(
      "The Ascent of Stan",
      "Ben Folds Five",
      "Rockin the Suburbs",
      "Piano Rock",
      "1998-03-04",
      "200"
    );
    cy.deleteRecord("The Ascent of Stan");
  });
  it("verifyPost", () => {
    cy.submitAndVerify(
      "The Ascent of Stan",
      "Ben Folds Five",
      "Rockin the Suburbs",
      "Piano Rock",
      "1998-03-04",
      "200"
    ).then((response) => {
      expect(response.status).to.eq(201);
    });
  });
});

// (2.5 points): As a developer, I will add an API test to verify my add posts and assert that the data has been added.
