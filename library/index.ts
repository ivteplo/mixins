// Copyright (c) 2022 Ivan Teplov

export type Class<T, Args extends any[]> = Function & {
  new(...args: Args): T
}

/**
 * Creates a function for creating a class with applied mixin
 * @param createClass - function that creates a class from a parent class and some parameters
 * @returns function to create a class with applied mixin
 */
export function createMixin<
  MixinParameters extends any[],
  ClassArguments extends any[],
  ClassInstanceType = any,
  ParentClass = Class<ClassInstanceType, ClassArguments>,
  MixinClass = ParentClass
>(
  createClass: (
    parentClass: ParentClass,
    ...params: MixinParameters
  ) => MixinClass
) {
  // We save created classes into a map.
  // Thus we don't create many classes that are the same in functionality
  const cache = new Map<ParentClass, MixinClass>()

  // The mixin function
  const mixin = (parent: ParentClass, ...props: MixinParameters) => {
    // If the class with mixin wasn't created earlier
    if (!cache.has(parent)) {
      // Save the class with mixin into cache object
      cache.set(parent, createClass(parent, ...props))
    }

    // Return the class
    return cache.get(parent)!
  }

  return mixin
}

export default createMixin
