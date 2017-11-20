
Section 5: Using classes to create Objects
==========================================

Creating classes and class properties
-------------------------------------
1. Classes allow you to prepare some type of blueprints for your objects
2. `private` makes accessible the variable for the class where is defined
3. `protected` is an extension of `private` and allows make accessible the variable for another classes
4. `public` keyword is a shortcut for create a property, getting the argument and assign it

Class methods and access modifiers
----------------------------------
1. Just use the dot notation and be aware of the properties's scope

Inheritance
-----------
1. Use the `extends` keyword when the class is defined

Inheritance and Constructors
----------------------------
1. The inherit class have to use the `super` keyword in his `constructor`

Inheritance Wrap Up
-------------------
1. All the exposed super class's properties and methods are accessible by the inherit class

Getters and Setter
------------------
1. Control the access to your properties.
2. Asign a value
3. Return a values

Static propeties and methods
----------------------------
1. `static` keyword allow us to use the properties of a class wihtout instantiate it.
2. Ideal for helpers classes

Abstract Classes
----------------
1. `abstract` keyword allow us to create classes that can't be instantiated. Works as a blueprint.
2. `abstract` keyword in methods doesn't have logic. Works as a guide to the class that use the abstract class to show that the logic of the abstract merhod is responsability of that class.
3.  Abstract classes always have to be inherit

Private constructors & singletons
---------------------------------
1. Singleton: Pattern: Have just one instance of a class in runtime

Readonly properties
-------------------
1. Use a getter
2. Add the `readonly` keyword in tha constructor paramete