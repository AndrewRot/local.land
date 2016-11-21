def main():
	f1 = open('market_latitude.txt', 'r').readlines()
	f2 = open('market_longitude.txt', 'r').readlines()
	f3 = open('market_names.txt', 'r').readlines()
	f4 = open('formatted_market_data.txt', 'w')
	
	for i, line in enumerate(f3):
		temp = f3[i].strip()+','+f1[i].strip()+','+f2[i].strip()+'\n'
		f4.write(temp)

	# f1.close()
	# f2.close()
	# f3.close()
	f4.close()

if __name__=="__main__":
	main()