//

//Version has merge heap and quick completed and uses each, no choice of which one to compare or what to compare in this version
//sort.cpp
// Deven Schwartz
// Project Sort: Comparison of sorts - Mergesort, Heapsort, QuickSort, etc.
// Prgram takes a file with ints and creates arrays to be sorted by heapsort, quicksort, and mergesort then outputs the operations, assignments, and time done by each for comparison.
//
//


//include files
#include<cassert>
#include<iostream>
#include<string>
#include<fstream>
#include <math.h>

using namespace std;

//globals for counts 
int Global_MergeOperation_Count = 0;
int Global_HeapOperation_Count = 0;
int Global_QuickOperation_Count = 0;
int Global_QuickAssignment_Count = 0;
int Global_MergeAssignment_Count = 0;
int Global_HeapAssignment_Count = 0;



//partition start
void partition(int low, int high, int& pivotpoint, int *QuickArray){

    //initilize vars needed
    int i = 0;
    int j = 0;
    int pivotitem = 0;
    int temp = 0;

    pivotitem = QuickArray[low];
    j = low;

    for(i = low + 1; i<= high; i++){//operation ++

        //inc oper cnt
        Global_QuickOperation_Count++;
        if(QuickArray[i] < pivotitem){

            j++;
            //swap items and inc assign cnts
            temp = QuickArray[i];
            Global_QuickAssignment_Count++;
            QuickArray[i] = QuickArray[j];
            Global_QuickAssignment_Count++;
            QuickArray[j] = temp;//assign + 3
            Global_QuickAssignment_Count++;

        }

    }

    pivotpoint = j;
    //swap again and inc assign cnt
    Global_QuickAssignment_Count++;
    QuickArray[low] = QuickArray[pivotpoint];
    Global_QuickAssignment_Count++;
    QuickArray[pivotpoint] = pivotitem;//assign + 3
    Global_QuickAssignment_Count++;

}
//partition end

//quicksort start
void quicksort(int low, int high, int * QuickArray){

    int pivotpoint = 0;

    if(high > low){
        //cout<<"here"<<endl;
        partition(low, high, pivotpoint, QuickArray);
        //cout<<"inhere"<<endl;
        quicksort(low, pivotpoint - 1, QuickArray);
        quicksort(pivotpoint + 1, high,QuickArray);

    }

}
//quicksort end

//start of merge
void merge(int h, int m, int * U, int *V, int * S){
    int i = 1;
    int j = 1;
    int k = 1;
    while(i <= h && j<= m){
        Global_MergeOperation_Count++;
        if (U[i] < V[j]){
            S[k] = U[i];
            Global_MergeAssignment_Count++;
            i++;
        }else{
            S[k] = V[j];
            Global_MergeAssignment_Count++;
            j++;
        }
        k++;
    }
    if(i > h){
        //loop
        for(int x= j; x <= m; x++){
            S[k] = V[x];
            Global_MergeAssignment_Count++;
            k++;
        }

    }else{
        //loops 
        for (int x = i; x <= h; x++){
            S[k] = U[x];
            Global_MergeAssignment_Count++;
            k++;
        
        }
    }

}
//end of merge

//start of mergesort
void mergesort(int n, int * S){

    if(n>1){
        int h = floor(n/2);
        //cout<< "hsdhsdfhsh"<<h<<endl;
        int m = n-h;
        int U[h];
        int V[m];
        //copy values into arrays
        //1-h
        for (int i = 1; i <= h; i++){    
            U[i] = S[i];   
            Global_MergeAssignment_Count++;  
        }
        //h+1 - n
        for (int i = h+1; i <= n; i++){
            V[i-h] = S[i];
            Global_MergeAssignment_Count++;
        }


        //mergesort and merge calls
        mergesort(h, U);
        mergesort(m, V);
        merge(h, m, U, V, S);

    }

}


struct heap{
    int S[600];
    int heapsize;
};



void siftdown(heap & H, int i){
    int parent;
    int largerchild;
    int siftkey;
    bool spotfound;

    Global_HeapAssignment_Count++;
	siftkey = H.S[i];
	parent = i;
	spotfound = false;

    while(2*parent <= H.heapsize && !spotfound){
        Global_HeapOperation_Count++;
        if(2*parent < H.heapsize && H.S[2*parent] < H.S[2*parent+1]){
            largerchild = 2 * parent + 1;

        }else{
            largerchild = 2*parent;
        }
        Global_HeapOperation_Count++;
        if(siftkey < H.S[largerchild]){
            Global_HeapAssignment_Count++;
            H.S[parent] = H.S[largerchild];
            parent = largerchild;

        }else{
            spotfound = true;
        }
        
    }

    Global_HeapAssignment_Count++;
    H.S[parent] = siftkey;



}




int root(heap & H){
    int keyout;
    Global_HeapAssignment_Count++;
    keyout = H.S[1];
    Global_HeapAssignment_Count++;
    H.S[1] = H.S[H.heapsize]; // cnt
    H.heapsize = H.heapsize - 1;
    siftdown(H, 1);
    return keyout;
}



void makeheap(int n, heap & H){
    int i;
    H.heapsize = n;
    for(i = floor(n/2); i>=1; i--){
        siftdown(H, i);
    }
}


void removekeys(int n, heap & H, int * S){
    int i;
    for(i = n; i>= 1; i--){
        Global_HeapAssignment_Count++;
        S[i] = root(H);

    }
}



void heapsort(int n, heap & H){
    makeheap(n, H);
    removekeys(n, H, H.S);

}




int main(){

    //crete arrays to store data in
    int MergeArray[600];
    int QuickArray[600];
    int HeapArray[600];

    //get a file from user 
    string fn;
    cout<<"Enter the name of a file containing the data"<<endl;

    // check for valid input have user reenter until a valid input is accepted
    while(true){
        
        cin >> fn;
        if(cin.good()){
            break;
        }else{
            cout<<"You entered invalid input, reenter a file name \n";
            cin.clear();
            cin.ignore(120,'\n');
        }

    }

    cout << "You entered: " << fn << endl;

    //vars needed
    int count = 1;
    int data = 0;

    //open file and check to make sure opened correctly
    ifstream fin;
    fin.open(fn.c_str());
    assert (fin.is_open());

    //read data from file (can assume all data is valid)
    while (true){ 
       

        fin>>data;
        //check for valid data and eof
        if (fin.eof() || !fin.good()){
            break;
        }

        //can assume this data is good
        //removed following print as it prints one number per line and is a waste of space
        //cout<<"Got a number from the file: "<< data <<endl;

        //add data to arrays
        MergeArray[count] = data;
        HeapArray[count] = data;
        QuickArray[count] = data;
        //inc pos
        count++;
    
    }
    //number of items testing print
    //cout<<"Number of items in array: "<<count-1<<"\n";

    //print the unsorted array
    cout<<"The unsorted array: \n";
    for(int i = 1; i<count; i++){
                //any array would work
        cout<<MergeArray[i]<<"  ";
    }
    cout<<"\n";


    //for report data
    //for (int i = 1; i<=1;i++){
    //  cout<<rand()<<endl;
    //}


    //Print the array sorted by heapsort, mergesort, and quicksort properly labled.
	cout<<"The number of items sorted: "<<count-1<<endl;
    //quick sort
    quicksort(1, count-1, QuickArray);

    cout<<"The Quick sorted array: \n";
    for(int i = 1; i<count; i++){

        cout<<QuickArray[i]<<"  ";
    }
    cout<<"\n";

    //merge 
    mergesort(count-1, MergeArray);
    
    cout<<"The Merge sorted array: \n";
    for(int i = 1; i<count; i++){

        cout<<MergeArray[i]<<"  ";
    }
    cout<<"\n";

    //create heap struct and store data
    //should have done at begining to avoid having to rewrite the array
	heap H;
	H.heapsize = count -1;
	for(int i = 1; i<=count; i++){
		H.S[i] = HeapArray[i];
	}
    //heapsort
    heapsort(count-1, H);
    
    cout<<"The Heap sorted array: \n";
    for(int i = 1; i<count; i++){
        //print struct array not original created array only strcut is going to change 
        cout<<H.S[i]<<"  ";
    }
    cout<<"\n";

                                                //count starts at 1 so -1 to get accurate value
    cout<<"\nNumber of items to be sorted: "<< count-1 <<endl;


    //print number of operations and assignments of each sort
    cout<<"\nNumber of assignments for heapsort: "<< Global_HeapAssignment_Count <<endl;
    cout<<"\nNumber of operations for heapsort: "<< Global_HeapOperation_Count <<endl;
    
    cout<<"\nNumber of assignments for mergesort: "<< Global_MergeAssignment_Count <<endl;
    cout<<"\nNumber of operations for mergesort: "<< Global_MergeOperation_Count <<endl;
    
    cout<<"\nNumber of assignments for quicksort: "<< Global_QuickAssignment_Count <<endl;
    cout<<"\nNumber of operations for quicksort: "<< Global_QuickOperation_Count <<endl;

    cout<<"\n";



}
