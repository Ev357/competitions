import Papa from "papaparse";

(async () => {
  // Retrieve filename from command line arguments
  const filename = Bun.argv[2];
  if (!filename) {
    console.error("No file provided");
  }

  // Set default output filename if not provided
  let outFilename = Bun.argv[3];
  if (!outFilename) {
    outFilename = "output.csv";
  }

  // Read file
  const file = Bun.file(filename);
  const textCsv = await file.text().catch(() => {
    console.error("Failed to read file");
  });
  if (!textCsv) return;

  // Parse CSV using PapaParse
  const papa = Papa.parse(textCsv);
  type Field = [string, string, string, string];
  const data = papa.data as Field[];

  // Remove header row
  data.shift();

  // Object to store parsed data
  const result: any = {};

  // Iterate through CSV rows
  data.forEach((item) => {
    const [_, name, subject, grade] = item;

    // Initialize nested object for each student
    if (!result[name]) {
      result[name] = {};
    }

    // Initialize array for each subject if not present
    if (!result[name][subject]) {
      result[name][subject] = [Number(grade)];
      return;
    }

    // Add grade to existing subject array
    result[name][subject].push(Number(grade));
  });

  // Function to calculate average of an array of numbers
  const calculateAverage = (values: number[]) =>
    Number(
      (
        values.reduce((a: number, b: number) => a + b, 0) / values.length
      ).toFixed(2)
    );

  // Array to store final CSV data
  const finalCsv: any[] = [];

  // Iterate through parsed data
  Object.entries(result).forEach(([name, subject]) => {
    const student: any = {};
    // Calculate average grade for each subject for a student
    Object.entries(subject as Object).forEach(([subject, grades]) => {
      const average = calculateAverage(grades);
      student[subject] = average;
    });

    // Calculate average of all subjects for a student
    const averageGrades = calculateAverage(
      Object.values(student).map((v) => Number(v))
    );

    // Push student data to final CSV array
    finalCsv.push({
      name,
      ...student,
      average: averageGrades,
    });
  });

  // Object to store average grades for each subject
  const averageGrades: any = {};
  // Object to store overall average grades
  const average: any = {
    name: "Všichni",
  };

  // Calculate average grades for each subject
  finalCsv.forEach((student) => {
    Object.entries(student).forEach(([subject, grade]) => {
      if (typeof grade !== "string") {
        if (!averageGrades[subject]) {
          averageGrades[subject] = [grade];
        } else {
          averageGrades[subject].push(grade);
        }
      }
    });
  });

  // Calculate overall average grades for each subject
  Object.entries(averageGrades).forEach(([subject, grades]) => {
    average[subject] = calculateAverage(grades as number[]);
  });

  // Push overall average data to final CSV array
  finalCsv.push(average);

  // Sort final CSV data alphabetically by student name
  finalCsv.sort((a, b) => {
    const nameA = a.name.toLowerCase();
    const nameB = b.name.toLowerCase();
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  });

  // Output final CSV data in tabular format
  console.table(finalCsv);

  // Convert final CSV data to string
  const finalStringCsv = Papa.unparse(finalCsv);

  // Write final CSV data to output file
  await Bun.write(outFilename, finalStringCsv);
})();
