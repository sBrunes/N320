def calculateFood():
    print("This worked")
    wage = float(input("How much do you spend on fresh produce each month? $"))
    #Fruits: Grapes, Bell peppers, and Apples
    print("\nFor $"+ str(wage) + " in San Salvador you can buy:\n")
    wage_grape = wage / 12
    wage_bellpepper = wage / 5.25
    wage_apple = wage / 1

    print(str(int(wage_grape)) + " bags of grapes\nOr")
    print(str(int(wage_bellpepper)) + " bell peppers\nOr")
    print(str(int(wage_apple)) + " apples")

    print("\nWhile in the US you could get\n")
    wage_grape = wage / 4.33
    wage_bellpepper = wage / .78
    wage_apple = wage / 0.39

    print(str(int(wage_grape)) + " bags of grapes\nOr")
    print(str(int(wage_bellpepper)) + " bell peppers\nOr")
    print(str(int(wage_apple)) + " apples")