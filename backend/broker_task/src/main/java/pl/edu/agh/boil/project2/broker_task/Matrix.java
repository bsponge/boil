package pl.edu.agh.boil.project2.broker_task;

public class Matrix {

    private static Double determinant(Double[][] matrix) {
        if (matrix.length != matrix[0].length)
            throw new IllegalStateException("invalid dimensions");

        if (matrix.length == 2)
            return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];

        Double det = 0.;
        for (int i = 0; i < matrix[0].length; i++)
            det += Math.pow(-1, i) * matrix[0][i]
                    * determinant(submatrix(matrix, 0, i));
        return det;
    }
	
    public static Double[][] inverse(Double[][] matrixAsArray) {
        Double[][] inverse = new Double[matrixAsArray.length][matrixAsArray.length];

        // minors and cofactors
        for (int i = 0; i < matrixAsArray.length; i++)
            for (int j = 0; j < matrixAsArray[i].length; j++)
                inverse[i][j] = Math.pow(-1, i + j)
                        * determinant(submatrix(matrixAsArray, i, j));

        // adjugate and determinant
        Double det = 1.0 / determinant(matrixAsArray);
        for (int i = 0; i < inverse.length; i++) {
            for (int j = 0; j <= i; j++) {
                Double temp = inverse[i][j];
                inverse[i][j] = inverse[j][i] * det;
                inverse[j][i] = temp * det;
            }
        }

        return inverse;
    }
    
    private static Double[][] submatrix(Double[][] matrix, int row, int column) {
        Double[][] submatrix = new Double[matrix.length - 1][matrix.length - 1];

        for (int i = 0; i < matrix.length; i++)
            for (int j = 0; i != row && j < matrix[i].length; j++)
                if (j != column)
                    submatrix[i < row ? i : i - 1][j < column ? j : j - 1] = matrix[i][j];
        return submatrix;
    }
	
}
