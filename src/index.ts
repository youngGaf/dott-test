// Take bitmap description from standard input
process.stdin.resume();
process.stdin.setEncoding('utf-8');

let stdin_input = '';

process.stdin.on('data', (input) => {
    stdin_input += input;
});

process.stdin.on('end', () => {
    main(stdin_input)
});

/**
* Main function
* Takes input from console, process and passes it to computing function
*
* @returns {void} nothing
*/
const main = (input: string): void => {
    const arr: string[] = input.trim().split("\n");
    
    for(let i = 1; i < arr.length; i+=1){
        const value: string[] = arr[i].trim().split(' ');
        if(value.length > 1){
            const matrix_size: number[] = [parseInt(value[0]), parseInt(value[1])];
            const bitmap: string[] = arr.slice(i+1, matrix_size[0]+i+1);
            
            computeDistance(matrix_size[0], matrix_size[1], bitmap);
        }
    }

}

/**
 * Distance computing function
 * @param {Array} bitmapMatrix the bitmaps for a textcase
 * @param {Number} n the number of rows
 * @param {Number} m the number of columns
 * 
 * @returns {void} nothing
*/
const computeDistance = (n: number, m: number, bitmapMatrix: string[]): void => {
    const queue = [];
    const ans: any[] = [];

    /* 
    Transverses through the bitmap matrix and stores the indexes for cells with 1's in 'queue'
    and populates the new 'ans' matrix.
    */
    for(let i = 0; i < n; i+=1){
        ans[i] = [];
        for(let j = 0; j < m; j+=1){
            if(bitmapMatrix[i][j] === '1'){
                ans[i][j] = 0
                queue.push([i,j]);
            }else{
                ans[i][j] = Infinity;
            }
        }
    }

    while(queue.length !== 0){
        const i: number = queue[0][0];
        const j: number = queue[0][1];
        queue.shift();

        const cord_x: number[] = [1, 0, -1, 0];
        const cord_y: number[] = [0, 1, 0, -1];

        for(let k = 0; k < 4; k+=1){
            const new_i = cord_x[k] + i;
            const new_j = cord_y[k] + j;
            
            // Ensures search does not exceed matrix size
            if(new_i >= 0 && new_j >= 0 && new_i<n && new_j<m){

                if(ans[new_i][new_j] > ans[i][j]){
                    ans[new_i][new_j] = ans[i][j] + 1;
                    queue.push([new_i, new_j]);
                }
            }
        }
    }
    // Writes output to console
    ans.forEach((el): void => {
        console.log(el.join(' '));
    });

}
