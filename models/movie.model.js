module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      id: String,
      title: String,
      release: Boolean,
    },
    { timestamps: true }
  );

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const movie = mongoose.model("movie", schema);
  return movie;
};
