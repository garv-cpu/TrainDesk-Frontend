import { useState } from "react";
import { GripVertical, Plus, CheckSquare } from "lucide-react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

export default function SOPEditor() {
  const [steps, setSteps] = useState([
    { id: "1", text: "Describe the task", checklist: [] },
    { id: "2", text: "Write clear instructions", checklist: [] },
  ]);

  const [title, setTitle] = useState("New SOP");

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const reordered = [...steps];
    const [moved] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, moved);
    setSteps(reordered);
  };

  const addStep = () => {
    setSteps([
      ...steps,
      { id: Date.now().toString(), text: "New Step", checklist: [] },
    ]);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <input
        type="text"
        value={title}
        onChange={e => setTitle(e.target.value)}
        className="text-3xl font-semibold border-none outline-none w-full mb-6"
      />

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="steps">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
              {steps.map((step, index) => (
                <Draggable key={step.id} draggableId={step.id} index={index}>
                  {(provided) => (
                    <div
                      className="bg-white border border-gray-200 p-4 rounded-lg shadow-sm flex gap-3 items-start"
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                    >
                      <div {...provided.dragHandleProps} className="pt-1 cursor-grab">
                        <GripVertical size={20} className="text-gray-400" />
                      </div>

                      <div className="flex-1">
                        <input
                          value={step.text}
                          onChange={(e) => {
                            const newSteps = [...steps];
                            newSteps[index].text = e.target.value;
                            setSteps(newSteps);
                          }}
                          className="font-medium text-gray-800 w-full outline-none border-b border-transparent focus:border-gray-300 pb-1"
                        />

                        {/* Checklist */}
                        <div className="mt-3 space-y-2">
                          {step.checklist.map((item, i) => (
                            <div key={i} className="flex items-center gap-2">
                              <CheckSquare size={16} className="text-green-600" />
                              <input
                                value={item}
                                onChange={(e) => {
                                  const newSteps = [...steps];
                                  newSteps[index].checklist[i] = e.target.value;
                                  setSteps(newSteps);
                                }}
                                className="text-sm outline-none border-b border-transparent focus:border-gray-300"
                              />
                            </div>
                          ))}

                          {/* Add new checklist item */}
                          <button
                            onClick={() => {
                              const newSteps = [...steps];
                              newSteps[index].checklist.push("Checklist item");
                              setSteps(newSteps);
                            }}
                            className="text-xs text-blue-600 hover:underline"
                          >
                            + Add checklist
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <button
        onClick={addStep}
        className="flex items-center gap-2 mt-6 text-sm px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
      >
        <Plus size={16} /> Add Step
      </button>
    </div>
  );
}
