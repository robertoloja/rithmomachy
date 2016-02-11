Separate game logic from presentation logic.

##Pieces:
- All pieces are a Piece object with the following fields:
  - Color
  - Shape
  - Value
  - Position

- Movement will be handled by a single function, movePiece().
  - Based on piece position and shape, it will determine valid moves and
    place the piece in the new position.

- Capture will be a function invoked by movePiece() if the movement is valid
  and allows for a capture.
