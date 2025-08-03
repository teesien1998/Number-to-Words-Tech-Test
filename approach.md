## Overview

This project addresses the challenge of converting numerical input into its full English word representation. For example, the input `123.45` is converted to:  
`ONE HUNDRED AND TWENTY-THREE DOLLARS AND FORTY-FIVE CENTS`.

The application includes:

- A Node.js backend API for processing numeric input and returning its word equivalent.
- A modern interactive React frontend to test and demonstrate the solution.

## Chosen Tech Stack

**Backend**: Node.js with Express  
**Frontend**: React with Tailwind CSS

This stack was selected for the following reasons:

- **Rapid development**: Fast setup and minimal boilerplate.
- **Unified language**: Both `backend` and `frontend` use JavaScript, enabling faster development, easier debugging, and smoother collaboration between components.
- **Personal familiarity**: I have hands-on experience with this stack, allowing me to focus on solving the problem rather than spending time setting up or configuring tools.

## Why I Chose This Approach

The number conversion logic was implemented using a recursive chunking method. Instead of separate logic for each scale (thousand, million, billion), the number is split into 3-digit chunks from right to left and converted recursively using a reusable `convert()` function. This works effectively because each scale follows a predictable pattern: a 3-digit number converted into words, followed by its corresponding scale label (e.g., "thousand", "million", "billion").

This approach provides:

- **Scalability:** It works for any number up to billions (and can be extended by updating the `multipliers` array).
- **Readability:** Logic is clear and modular.
- **Accuracy:** It handles proper grammar and pluralization (Dollar vs. Dollars, Cent vs. Cents).

From a time complexity perspective, the algorithm runs in **O(log₁₀(n))** time, since we divide the number by 1,000 repeatedly (effectively grouping every 3 digits). This is efficient even for very large numbers.

### Why Not Other Approaches?

Alternative solutions such as writing long `if-else` chains to manually handle each numeric scale (e.g., thousands, millions, billions) were intentionally avoided.

These methods tend to:

- Be harder to maintain
- Be more error-prone
- Lack scalability for future enhancements (e.g., supporting trillions or different currencies)

In contrast, the **recursive chunking** technique offers:

- Clean and modular logic
- Easier debugging
- Long-term extensibility

## The Number-to-Words Converter Logic

The core of the conversion relies on:

1. **Mapping arrays**: `belowTwenty`, `tens`, and `multipliers` provide word equivalents.

2. **Recursive function `convert(n)`**:

   - Converts any number less than 1000 using direct logic.

   - For numbers ≥ 1000, splits into 3-digit chunks and recursively builds the full word representation with appropriate scale label words (e.g., Thousand, Million).

3. **Currency logic**:

   - Amount is split into `dollars` and `cents`.

   - Each is converted separately and combined as:  
      `"XXX DOLLARS AND XXX CENTS"`
