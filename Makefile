all: valiform

valiform: src clean
	tsc
	gulp build

clean:
	rm -f dist/*.js