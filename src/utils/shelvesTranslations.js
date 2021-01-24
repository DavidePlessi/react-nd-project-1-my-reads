export default function (key) {
  switch (key){
    case "currentlyReading":
      return "Currently reading";
    case "wantToRead":
      return "Want to Read"
    case "read":
      return "Read"
    default:
      return key
  }
}