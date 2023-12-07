import { runSequence } from "./shared/sequenceRunner.js";

const emptySequence = [
    "sketches/example-sequence-empty",
    "sketches/example-sequence-empty",
]

const exampleSequence = [
    "sketches/Day1",
    "sketches/Day2",
    "sketches/Day3",
    "sketches/Day4"
]

runSequence(exampleSequence)