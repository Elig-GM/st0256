package _java;

public class gauss {
    public static void main(String[] args) {
        int n = 4, i, j, k, cont = 1; 
        double[][] a =  {
                {20, -1, 3, 4, 30},
                {6, 23, 4, 3, -10},
                {7, 21, 46, 9, 20},
                {-3, -9, 12, 38, -14}
            };
        double[] x = new double[4];
        double b, temp;
  
        for (j = 0; j <= n - 1; j++){
            for (i = j + 1; i <= n - 1; i++){
                b = a[i][j] / a[j][j];
                for (k = 0; k <= n; k++){
                    a[i][k] = a[i][k] - b * a[j][k];
                }
            }
        }
        
        System.out.print("\nSolution:\n\n");
        
        for (i = 0; i < n; i++){
            System.out.print("|");
            for (j = 0; j <= n; j++){
                if(j != n) 
                    System.out.printf(" %5.1f ", a[i][j]);
                else
                    System.out.printf("| %5.1f |\n", a[i][j]);
            }
        }

        x[0] = a[n - 1][n] / a[n - 1][n - 1];
        System.out.printf("\nX4: %.11f ", x[0]);

        for (i = n - 2; i > -1; i--){
            temp = a[i][n];
            for (j = i + 1, k = cont - 1; j < n; j++, k--){
                temp -= a[i][j] * x[k];
            }
            x[cont] = temp / a[i][i];
            System.out.printf("\nX%d: %.11f ", 4-cont,x[cont]);

            cont++;
        }

    }
}
