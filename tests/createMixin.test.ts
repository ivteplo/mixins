// Copyright (c) 2022 Ivan Teplov

import createMixin from "../library"

const helper = () => {
  const addLengthProperty = createMixin(
    (ParentClass, prop) =>
      class WithLength extends ParentClass {
        get length() {
          return this[prop].length
        }
      }
  )

  class Parent {
    items = []
  }

  return {
    addLengthProperty,
    Parent,
    ResultingClass: addLengthProperty(Parent, "items"),
  }
}

describe("createMixin", () => {
  it("generates a class, instance of which has both parent's and mixin's properties", () => {
    const { ResultingClass } = helper()

    const instance = new ResultingClass()
    expect(instance.length).toEqual(0)
    expect(instance.items).toEqual([])

    instance.items = new Array(5)
    expect(instance.length).toEqual(instance.items.length)
  })

  it("caches generated classes", () => {
    const { addLengthProperty, Parent, ResultingClass } = helper()

    const ResultingClassCached = addLengthProperty(Parent, "items")
    expect(ResultingClassCached).toBe(ResultingClass)
  })
})
