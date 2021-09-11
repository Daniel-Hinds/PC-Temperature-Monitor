using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using OpenHardwareMonitor.Hardware;
using System.IO;
using System.Threading;
namespace Get_CPU_Temp5
{
    class Program
    {
        public class UpdateVisitor : IVisitor
        {
            public void VisitComputer(IComputer computer)
            {
                computer.Traverse(this);
            }
            public void VisitHardware(IHardware hardware)
            {
                hardware.Update();
                foreach (IHardware subHardware in hardware.SubHardware) subHardware.Accept(this);
            }
            public void VisitSensor(ISensor sensor) { }
            public void VisitParameter(IParameter parameter) { }
        }
        static void GetSystemInfo()
        {
            UpdateVisitor updateVisitor = new UpdateVisitor();
            Computer computer = new Computer();
            computer.Open();
            computer.CPUEnabled = true;
            computer.GPUEnabled = true;
            computer.Accept(updateVisitor);
            for (int i = 0; i < computer.Hardware.Length; i++)
            {
                if (computer.Hardware[i].HardwareType == HardwareType.CPU)
                {
                    for (int j = 0; j < computer.Hardware[i].Sensors.Length; j++)
                    {
                        if (computer.Hardware[i].Sensors[j].SensorType == SensorType.Temperature)
                        {
                            string CPUtemp = computer.Hardware[i].Sensors[j].Value.ToString() + "\r";
                            Console.WriteLine(CPUtemp);
                            using (StreamWriter writetext = new StreamWriter("D://Temp Panel//CPU.txt"))
                            {
                                writetext.WriteLine(CPUtemp);
                            }
                        }
                            
                    }
                }
            }
            foreach (var hardwareItem in computer.Hardware)
            {

                if (hardwareItem.HardwareType == HardwareType.GpuNvidia)
                {
                    foreach (var sensor in hardwareItem.Sensors)
                    {
                        if (sensor.SensorType == SensorType.Temperature)
                        {
                            var GPUtemp = (sensor.Value);
                            Console.WriteLine(GPUtemp);
                            using (StreamWriter writetext = new StreamWriter("D://Temp Panel//GPU.txt"))
                            {
                                writetext.WriteLine(GPUtemp);
                            }
                        }
                    }
                }

            }
            computer.Close();
        }
        static void Main(string[] args)
        {
            while (true)
            {
                GetSystemInfo();
                Thread.Sleep(5000);
            }
        }
    }
}