
#define _GNU_SOURCE
#include<stdio.h>
#include<stdlib.h>
#include<unistd.h>
#include<string.h>
#include<sys/wait.h>
#define BUF_SIZE 10000
extern char **environ;

int main(int argc, char **argv)
{

    char buf[BUF_SIZE];
    char *cwd[100];

    while (1) {
	printf("%s: $ ", getcwd(*cwd, 1000));
//	fgets(buf, BUF_SIZE, stdin);
	if (fgets(buf, BUF_SIZE, stdin) == NULL) {
	   // printf("\n");
	break;
	}
	buf[strlen(buf) - 1] = 0;
	if (strlen(buf) == 0)
	    continue;		//restart the while 
//echo builtin --------------------
	if (strncmp(buf, "echo", 4) == 0) {
	    printf("%s\n", buf + 5);
	    continue;
	}
//------------------
	else if ((strncmp(buf, "exit", 4) == 0)) {
	break;
	}
//exit------------                      
	pid_t pid = fork();
	if (pid > 0) {
	    int status;
	    //  printf("I AM THE PARENT\n");
	    wait(&status);
	} else if (pid == 0) {
	    char *new_argv[] = { buf, NULL };
	    char *new_envp[] = { NULL };
	    execvpe(buf, new_argv, new_envp);
	    printf("EXEC FAILED: KERNEL NOT IN THE MOOD TO RUN\n");
	    exit(-1);

	} else {
	    printf("Failed to fork");
	    exit(-2);
	}

    }				
    return 0;
}
