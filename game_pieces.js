const piece = {
	init: function (color, shape, value, position) {
		this.color = color;
		this.shape = shape;
		this.value = value;
		this.position = position;
	}
};

const round = Object.create(piece);
round.shape = "round";
