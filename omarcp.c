#include<stdio.h>
#include <unistd.h>
#include <stdlib.h>
#include <fcntl.h>

#define COUNT 100

//cat utility: dump file as text on terminal
int main(int argc , char* argv[] )
{
char buf[COUNT];


if(argc != 3){
printf("BAD USAGE\n");
exit(-1);
}



int fd = open(argv[1], O_RDONLY ,0644);

if(fd <0){
printf("COULD NOT READ FILE\n");
exit(-2);
}

int num_read = read(fd, buf , COUNT) ; // number of bytes successfully read in returned by read() func/syscall
				       				       
int fd2 = open(argv[2], O_RDWR| O_CREAT|O_TRUNC, 0644 );


// open or create a file then write in it instead of writing on terminal

while( num_read >0){
        if( write(fd2, buf , num_read ) <0){  //write on output no.1: terminal , (buf) contents , for (num_read times) 
        printf("WRITE FAILED\n");
exit(-3);       
        }
num_read= read(fd,buf , COUNT);

}
close(fd);

//close(fd2);
return 0;
}

