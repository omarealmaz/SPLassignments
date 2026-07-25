
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
	if (fgets(buf, BUF_SIZE, stdin) == NULL) {
	    break;
	}
	buf[strlen(buf) - 1] = 0;
	if (strlen(buf) == 0)
	    continue;		//restart the while 

	char raw_buf[BUF_SIZE];
	strcpy(raw_buf, buf);
	char *new_argv[100];
	int i = 0;
	char *new_envp[] = { NULL };

	new_argv[i] = strtok(buf, " ");	//grab the first word
	while (new_argv[i] != NULL) {
	    i++;
	    new_argv[i] = strtok(NULL, " ");
	}
//echo builtin --------------------
	if (strcmp(new_argv[0], "echo") == 0) {
	    for (int j = 1; j < i; j++) {
		printf("%s ", new_argv[j]);
	    }
	    printf("\n");

	    continue;
	}
//cd builtin----------------------
	if (strcmp(new_argv[0], "cd") == 0) {
	    if (new_argv[1] == NULL) {
		printf("cd: missing argument\n");
	    } else {

		if (chdir(new_argv[1]) != 0)	//change the directory of parent shell(pico)
		{
		    perror("cd failed");	//function prints error  
		}
	    }
	    continue;
	}
//------------------
	else if ((strcmp(new_argv[0], "exit") == 0)) {
	    printf("Good Bye :) \n");
	    break;
	}
//exit------------                      
	pid_t pid = fork();
	if (pid > 0) {
	    int status;
	    wait(&status);
	} else if (pid == 0) {
	    execvpe(buf, new_argv, new_envp);
	    // printf ("EXEC FAILED: KERNEL NOT IN THE MOOD TO RUN\n");
	    printf("%s: command not found\n", new_argv[0]);
	    exit(-1);

	} else {
	    printf("Failed to fork");
	    exit(-2);
	}

    }
    return 0;
}
