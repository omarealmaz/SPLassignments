#include<stdio.h>
#include <unistd.h>
#include<stdlib.h>


int size = 100 ;

int main( ){

char *buf = malloc(size);

while(  (getcwd(buf, size) == NULL  )) {
size= 2*size;
char *buf2 = realloc(buf, size) ;

}
printf("%s\n",getcwd(buf, size));


return 0;
}
